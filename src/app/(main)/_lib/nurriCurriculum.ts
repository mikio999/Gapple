const nurriCurriculum = {
  mockData: [
    {
      document_id: 1,
      author_id: 1,
      activity_plan: {
        title: '산책 계획안',
        subject: ['건강 증진'],
        activity_content: [
          {
            subtitle: '소제목 1',
            content: '매일 아침 30분 산책하기',
          },
          {
            subtitle: '소제목 2',
            content: '주변 공원 방문하기',
          },
        ],
        file: [
          {
            url: 'https://example.com/path/to/plan.pdf',
            type: 'application/pdf',
          },
        ],
      },
      activity_record: {
        image: ['/images/우사기.webp', '/images/치이카와.webp'],
        content: '오늘의 산책은 매우 상쾌했습니다!',
        file: [
          {
            url: 'https://example.com/path/to/record.pdf',
            type: 'application/pdf',
          },
        ],
      },
      is_liked: true,
      bookmark_count: 35,
      created_dt: '2024-08-26T12:00:00Z',
    },
    {
      document_id: 2,
      author_id: 2,
      activity_plan: {
        title: '요리 클래스 계획',
        subject: ['요리 기술 향상'],
        activity_content: [
          {
            subtitle: '소제목 1',
            content: '이탈리안 요리 배우기',
          },
          {
            subtitle: '소제목 2',
            content: '프랑스 요리 도전하기',
          },
        ],
        file: [
          {
            url: 'https://example.com/path/to/plan2.pdf',
            type: 'application/pdf',
          },
        ],
      },
      activity_record: {
        image: ['/images/쿠리만쥬.webp', '/images/하치와레.webp'],
        content: '오늘의 요리 수업은 정말 즐거웠어요!',
        file: [
          {
            url: 'https://example.com/path/to/record2.pdf',
            type: 'application/pdf',
          },
        ],
      },
      is_liked: false,
      bookmark_count: 15,
      created_dt: '2024-08-25T11:30:00Z',
    },
  ],
};

export default nurriCurriculum;
