export interface CurriculumItem {
  selectedNurri: string;
  selectedSubNurri: string;
  selectedCurriculum: string;
}

export function transformNuriCurriculumToInitialState(
  nuriCurriculum: Record<string, Record<string, string[]>>,
): CurriculumItem[] {
  return Object.entries(nuriCurriculum).flatMap(
    ([nurriCategory, subCategories]) =>
      Object.entries(subCategories as Record<string, string[]>).flatMap(
        ([subCategory, details]) =>
          (details as string[]).map((detail) => ({
            selectedNurri: nurriCategory,
            selectedSubNurri: subCategory,
            selectedCurriculum: detail,
          })),
      ),
  );
}

export function buildNuriCurriculum(
  curriculumComponents: CurriculumItem[],
): any {
  const result: any = {};

  curriculumComponents.forEach(
    ({ selectedNurri, selectedSubNurri, selectedCurriculum }) => {
      if (!result[selectedNurri]) {
        result[selectedNurri] = {};
      }
      if (!result[selectedNurri][selectedSubNurri]) {
        result[selectedNurri][selectedSubNurri] = [];
      }
      result[selectedNurri][selectedSubNurri].push(selectedCurriculum);
    },
  );

  return result;
}
