import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {

  async create(req: Request, res: Response){
    const { email } = req.body;
    
    const usersRepository = getCustomRepository(UsersRepository)

    const userExists = await usersRepository.findOne({ email })
    if(userExists){
      return res.status(400).json({error: 'usuario ja existe!'})
    }
    
    const user = usersRepository.create(req.body)
    await usersRepository.save(user);

    return res.status(201).send(user);
  }

}

export { UserController };