import CreateCategoryUseCase from "./CreateCategoryUseCase";
import CategoriesRepositoryInMemory from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

let categoryResopitoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoryResopitoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryResopitoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoryResopitoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });
});
