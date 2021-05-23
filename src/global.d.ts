/// <reference types="@sveltejs/kit" />

declare module "@mailchimp/mailchimp_marketing" {
    
    interface Config {
        apiKey: string
        server: string 
    }
    
    export function setConfig(config: Config)
    
    export type Fields = {
        email_address: string
        status_if_new: string
        merge_fields: object
    }
    
    export const lists: {
        setListMember: (value: string, hash: string, fields: Fields) => Promise<any>
    }
}


declare module "md5" {
    export default function md5(value: string): string
}