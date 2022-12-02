import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList() {
  const { data, isLoading } = useQuery(["issues"], () =>
    fetch("/api/issues").then((res) => res.json())
  );

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
