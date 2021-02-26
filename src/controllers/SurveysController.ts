import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {
  async create(req: Request, res: Response){
    const { title } = req.body;

    const surveysRepository = getCustomRepository(SurveysRepository);


    const surveyExists = await surveysRepository.findOne({ title });
    if(surveyExists){
      return res.status(400).json({error: 'Survey ja existe!'})
    }
    
    const survey = surveysRepository.create(req.body)
    await surveysRepository.save(survey);

    return res.status(201).send(survey);

  }

  async show(req: Request, res: Response){
    const surveysRepository = getCustomRepository(SurveysRepository);

    const allSurveys = await surveysRepository.find();
 

    return res.status(200).send(allSurveys)
  }

} 

export { SurveysController } 