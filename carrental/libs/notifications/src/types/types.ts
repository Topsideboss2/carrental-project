export interface INotificationsService {
    app_id: string,
    contents: object,
    channel_for_external_user_ids: string,
    include_external_user_ids: string[],
}

export interface ISingleEmail {
    app_code: string,
    email: string,
    subject: string,
    body: string
}

export interface ISingleSMS {
  app_code: string,
  phone: string,
  message: string,
}

