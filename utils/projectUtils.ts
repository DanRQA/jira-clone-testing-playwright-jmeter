import { faker } from "@faker-js/faker";

/**
 * Generates random project details using faker
 * @returns {{ projectTitle: string, projectDescription: string }} Object containing generated project title and description
 */
export function generateProjectDetails(): { projectTitle: string; projectDescription: string } {
  return {
    projectTitle: `${faker.lorem.words(3)}`,
    projectDescription: `${faker.lorem.sentence()}`,
  };
}
