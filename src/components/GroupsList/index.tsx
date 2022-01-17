import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

import type { GroupsApi, SeatsApi } from "../../@types";
import CreateGroup from "../CreateGroup";
import Ticket from "../Ticket";
import styles from "./GroupsList.module.css";

const GroupsList = (): JSX.Element => {
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const { data, error, mutate } = useSWR<GroupsApi>("/groups");
  const { data: sectionsData, error: sectionsError } =
    useSWR<SeatsApi>("/seats");

  const handleExpandGroup = useCallback(
    (groupId: string) => () =>
      expandedGroups.includes(groupId)
        ? setExpandedGroups(expandedGroups.filter((id) => id !== groupId))
        : setExpandedGroups([...expandedGroups, groupId]),
    [setExpandedGroups, expandedGroups]
  );

  const handleCreateGroup = () => setCreatingGroup(true);

  const handleCreatedGroup = (submitted: boolean) => {
    setCreatingGroup(false);

    if (submitted) {
      mutate([]);
    }
  };

  const sectionsList = useMemo(
    () =>
      sectionsError ? [] : sectionsData?.map(({ section }) => section.name),
    [sectionsData, sectionsError]
  );

  if (error || sectionsError) {
    return <h2>Could not load data</h2>;
  }

  if (!data) {
    return (
      <div className={styles.container}>
        <h1>Loading...</h1>
        <button onClick={handleCreateGroup}>+ Create new group</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {data.map((group) => (
        <div
          key={group._id}
          onClick={handleExpandGroup(group._id)}
          className={classNames(styles.group, {
            [styles.expanded]: expandedGroups.includes(group._id),
          })}
        >
          <h3 className={styles.groupId}>
            Group token:{" "}
            <span className={styles.groupIdValue}>
              {group._id.replace(/^group:/, "")}
            </span>
          </h3>
          <div className={styles.info}>
            <div className={styles.field}>
              <span className={styles.label}>Count:</span>
              <span className={styles.value}>{group.count}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Requests aisle:</span>
              <span className={styles.value}>{group.aisle ? "Yes" : "No"}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Rank:</span>
              <span className={styles.value}>{group.rank}</span>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Section:</span>
              <span className={styles.value}>{group.section}</span>
            </div>
          </div>
          {expandedGroups.includes(group._id) && <Ticket groupId={group._id} />}
        </div>
      ))}
      <button className={styles.createGroup} onClick={handleCreateGroup}>
        + Create new group
      </button>
      {creatingGroup && (
        <CreateGroup
          sections={sectionsList || []}
          handleClose={handleCreatedGroup}
        />
      )}
    </div>
  );
};

export default GroupsList;
