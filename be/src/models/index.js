import userModel from "./user.model";
import answerModel from "./answer.model";
import commentModel from "./comment";
import commentSurvey from "./commentSurvey";
import commentMeta from "./commentMeta";
import App from './app.model'
class Model {
  constructor() {
    this.User = userModel
    this.Answer = answerModel;
    this.Comment = commentModel
    this.CommentSurvey = commentSurvey
    this.CommentMeta = commentMeta
    this.App = App;
  }
}
export default new Model();
