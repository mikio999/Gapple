import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IDocumentData } from '@/types/document';
import { postSubject } from './subjectApi';
import { postDocument } from './documentApi';
import { ISelectedAnswers } from '@/types/aiOption';

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
        console.log('Subject posted successfully:', data);
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
      onSuccess: (data) => {
        console.log('Document posted successfully:', data);
        queryClient.invalidateQueries(['document', documentId]);
      },
      onError: (error) => {
        console.error('Error posting document:', error);
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
