import type { ServerRequest, EndpointOutput } from "@sveltejs/kit/types/endpoint"
import mailchimp from "@mailchimp/mailchimp_marketing"
import md5 from "md5"

mailchimp.setConfig({
    apiKey: process.env["MAILCHIMP_API_KEY"],
    server: process.env["MAILCHIMP_SERVER_PREFIX"],
})

function setMember(email_address: string, status_if_new: string, merge_fields = {}) {
    return mailchimp.lists.setListMember(
        process.env["MAILCHIMP_AUDIENCE_ID"],
        md5(email_address.toLowerCase()),
        {
            email_address,
            status_if_new,
            merge_fields
        }
    )
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