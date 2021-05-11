import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repositorys/MessagesRepository";

interface IMessageCreate {
  admin_id: string;
  text: string;
  user_id: string;
}

class MessagesService {
  async create({ admin_id, text, user_id }: IMessageCreate) {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const message = messagesRepository.create({
      admin_id,
      text,
      user_id,
    });

    await messagesRepository.save(message);
    return message;
  }

  async showByUser(user_id: string) {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const messages = await messagesRepository.find({
      user_id
    });

    return messages;
  }
}

export { MessagesService };
