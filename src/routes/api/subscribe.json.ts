import type { ServerRequest, EndpointOutput } from "@sveltejs/kit/types/endpoint"
import Mailchimp from 'mailchimp-api-v3'
import md5 from "md5"



function setMember(email_address: string, status_if_new: string, merge_fields = {}) {
    // @ts-ignore
    const mailchimp: Mailchimp = new Mailchimp(process.env["MAILCHIMP_API_KEY"], process.env["MAILCHIMP_SERVER_PREFIX"])
    return mailchimp.put(`/lists/${process.env['MAILCHIMP_AUDIENCE_ID']}/members/${md5(email_address.toLowerCase())}`, {
        email_address,
        status_if_new,
        merge_fields
    })
}

export async function post({ body }: ServerRequest<Record<string, any>, { email?: string, phone?: string }>): Promise<EndpointOutput> {
    const { email, phone } = body

    if (!email) return {
        status: 400,
        body: {
            message: "Expected body.email"
        }
    }

    // add this person to the audience with status of `pending` if new
    try {
        const response = await setMember(email, "pending", {
            PHONE: phone
        })
        console.log({ response })
    } catch (error) {
        console.error(error)
        return {
            status: 500
        }
    }
    
    return {
        status: 200,
        body: {
            message: "success"
        }
    }
}