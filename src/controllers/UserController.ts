import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {

  async create(req: Request, res: Response){
    const { email } = req.body;
    
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({ email })
    if(userExists){
      return res.status(400).json({error: 'usuario ja existe!'})
    }
    
    const user = usersRepository.create(req.body)

    await usersRepository.save(user);

    return res.send(user);
  }

}

export { UserController };