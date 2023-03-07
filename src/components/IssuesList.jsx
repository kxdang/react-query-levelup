import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList({ labels, status }) {
  const { data, isLoading } = useQuery(["issues", { labels, status }], () => {
    const statusString = status ? `&status=${status}` : "";
    const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
    return fetch(`/api/issues?${labelsString}${statusString}`).then((res) =>
      res.json()
    );
  });

  return (
    <div>
      <h1>Issues List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {data.map((issue) => (
            <IssueItem {...issue} />
          ))}
        </ul>
      )}
    </div>
  );
}
