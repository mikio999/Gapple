import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IDocumentData } from '@/types/document';
import { postSubject } from './subjectApi';
import { postDocument } from './documentApi';

export function useAi(
  subjectId: number,
  documentId: number,
  accessToken: string,
) {
  const queryClient = useQueryClient();

  const postSubjectMutation = useMutation(
    (subjectData: {
      age: number;
      groupSize: string;
      subject: string;
      activityType: string;
    }) => postSubject(subjectData, accessToken),
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
