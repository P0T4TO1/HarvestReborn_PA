'use server';

import { IRegisterBusiness, IRegisterOrganization } from "@/interfaces"
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { error } from "console";
import { revalidatePath } from "next/cache";

export const authRegisterBusinessAction = async ({
    owner_name,
    owner_surnames,
    business_email,
    business_name,
    business_pass,
    business_tel,
    business_path,
}: IRegisterBusiness) => {
    try{
        const emailAlreadyExist = await prisma.user.findFirst({
            where: {
                user_email: business_email,
            }
        });
        if (emailAlreadyExist) {
            return{
                data: null,
                message: "Este correo ya esta registrado"
            };
        }

        const user = await prisma.user.create({
            data: {
                user_email: business_email,
                user_pass: await hash(business_pass, 10),
                role_id: 2
            },
        });

        const business = await prisma.business.create({
            data: {
                businessOwnerName: owner_name,
                businessOwnerSurname: owner_surnames,
                business_name: business_name,
                business_tel,
                user_id: await prisma.user.findUnique({
                    where: {
                        user_email: business_email,
                    }
                }).then(),
            }
        })

        return {
            data: {user, business},
            message: 'El usuario se registro correctamente'
        };

    }catch(e){
        console.info('[ERROR_AUTH_REGISTER]', error);
        return {
            data: null,
            message: 'Algo salio mal',
        }
    }finally{
        revalidatePath(business_path)
    }
};

export const authRegisterOrganizationAction = () => {

}