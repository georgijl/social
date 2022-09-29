import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const CreateUser = async () => {
  const userRepo = getRepository(User);
  const user = userRepo.create({ firstName: "Georgi", lastName: "Ivanov" });
  await userRepo.save(user).catch((error) => {
    console.log(`Error, ${error}`);
  });
  console.log(`New user Saved with id ${user.id}`);
};
