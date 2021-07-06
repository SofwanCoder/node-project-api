import { StatusCodes } from "http-status-codes";
import { generateMessage } from "../shared/utils/responseManager";
class WebService {

  public static async subscribeEmail(email: string) {
    return generateMessage("Subscribed successfully", StatusCodes.OK);
  }

  public static async contactUs(body: {
    name: string;
    email: string;
    subject: string;
    phone: string;
    message: string;
  }) {
    const message = `
<strong style="margin-top: 20px; margin-bottom: 20px">
  NAME: <br />${body.name}<br/><br/>
  EMAIL: <br />${body.email}<br/><br/>
  SUBJECT: <br />${body.subject}<br/><br/>
  PHONE NUMBER: <br />${body.phone}<br/><br/>
  MESSAGE: <br /><pre>${body.message}</pre><br/><br/>
</strong>`;

    return generateMessage("Sent successfully", StatusCodes.OK);
  }
}

export default WebService;
