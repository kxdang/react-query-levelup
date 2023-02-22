import { Link } from "react-router-dom";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../helpers/useUserData";

export const IssueItem = ({
  id,
  title,
  assignee,
  number,
  comments,
  createdBy,
  createdDate,
  labels,
  status,
}) => {
  const assigneeUser = useUserData(assignee);
  const createdByUser = useUserData(createdBy);
  console.log(assigneeUser.data);
  return (
    <li key={id}>
      <div>
        {status == "done" || status == "cancelled" ? (
          <GoIssueClosed style={{ color: "red" }} />
        ) : (
          <GoIssueOpened style={{ color: "green" }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <span key={label} className={`label red`}>
              {label}
            </span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)}{" "}
          {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : ""}
        </small>
      </div>
      {assignee ? (
        <img
          src={
            assigneeUser.isSuccess ? assigneeUser.data.profilePictureUrl : null
          }
          className="assigned-to"
          alt={`assigned to ${
            assigneeUser.isSuccess ? assigneeUser.data.name : "avatar"
          }`}
        />
      ) : null}
      <span className="comment-count">
        {comments.length > 0 ? (
          <>
            <GoComment />
            {comments.length}
          </>
        ) : null}
      </span>
    </li>
  );
};
