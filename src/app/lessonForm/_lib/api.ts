const submitLessonForm = async (formData) => {
  try {
    const response = await fetch(`${process.env.BASE_API}/document/plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('API 제출 실패:', error);
    throw error;
  }
};

export default submitLessonForm;
