// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';

const prisma = new PrismaClient({ log: ['query', 'info'] });

const categorys = [
    { "name": "poesía" },
    { "name": "cuentos" },
    { "name": "teatro" },
    { "name": "danza" },
    { "name": "escultura" },
    { "name": "música" },
    { "name": "pintura" },
    { "name": "fotografía" },
    { "name": "baile " },
    { "name": "canto" },
    { "name": "stand-up" },
    { "name": "mimo" },
    { "name": "diversion infantil" }
]

const categoryController = {
    createCategoriesDefault: async () => {
        const categorysDb = await prisma.category.findMany()
        try {
            if (!categorysDb.length) {
                categorys.map(async (ele: { name: string; }) => {
                    await prisma.category.create({
                        data: {
                            name: ele.name,
                            asignedBy: 'ADMIN'
                        }
                    })
                })
            }
        } catch (error) {
            return error
        }
    },
    createCategory: async (req: Request, res: Response)=>{
        const {name} = req.body
        const category = await prisma.category.findMany({
            where:{
                name: name
            }
        })
        
            try {
                if(category){
                res.status(400).json({succes:false, message: 'ya existe la categoria'})

                }else{
                    const newCategory = await prisma.category.create({
                        data:{
                            name:name,
                            asignedBy:'ADMIN'
                        }
                    })
    
                    res.status(200).json({data:newCategory})
                }
            } catch (error) {
                res.status(400).json({message:error})
            }
    },
    getCategories: async (_req: Request, res: Response) => {
        const categories = await prisma.category.findMany()
        res.status(200).json({ data: categories.sort() });
    },
    getCategoryId: async (req: Request, res: Response) => {
        const {id} = req.params
        console.log(id);
        const category = await prisma.category.findUnique({
            where:{
                id:parseInt(id)
            },
            include:{
                shows:{
                    select:{
                        show:true
                    }
                }
            }
        })
        res.status(200).json({succes:true, data:category})
    }
}

export default categoryController;








