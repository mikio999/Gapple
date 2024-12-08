import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IDocumentData } from '@/types/document';
import { ISelectedAnswers } from '@/types/aiOption';
import { postSubject } from './subjectApi';
import { postDocument } from './documentApi';
import { useSubjectStore } from '../_store/useSubjectStore';

export function useAi(
  accessToken: string,
  subjectId: number,
  documentId: number,
) {
  const queryClient = useQueryClient();

  const postSubjectMutation = useMutation(
    (subjectData: ISelectedAnswers) => postSubject(subjectData, accessToken),

    {
      onSuccess: (data) => {
        const { setSubjectData } = useSubjectStore.getState();
        setSubjectData(data);
        queryClient.invalidateQueries(['subject', subjectId]);
      },
      onError: (error) => {
        console.error('Error posting subject:', error);
      },
    },
  );
  const postDocumentMutation = useMutation(
    (documentData: IDocumentData) => postDocument(documentData, accessToken),
    {
      retry: 3,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // 지수적 증가 (최대 30초)

      onSuccess: (data) => {
        const { setDocumentData } = useSubjectStore.getState();
        setDocumentData(data);
        queryClient.invalidateQueries(['document', documentId]);
      },

      onError: (error) => {
        console.error('Error posting document:', error);

        alert('문서 업로드에 실패했습니다. 다시 시도해주세요.');
      },
    },
  );

  return {
    addSubject: postSubjectMutation.mutate,
    addDocument: postDocumentMutation.mutate,
    subjectMutationState: postSubjectMutation,
    documentMutationState: postDocumentMutation,
  };
}
