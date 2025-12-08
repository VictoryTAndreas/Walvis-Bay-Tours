import React from "react";

const Planmember = ({ members, sendRequest }) => {
  return (
    <div
      className="min-h-[80vh] min-w-[70vw] bg-white shadow-2xl rounded text-black md:grid grid-cols-3 gap-2 sm:grid-cols-2"
      onClick={(e) => e.stopPropagation()}
    >
      {members.length > 0 ? (
        members.map((member, ind) => (
          <div
            className="m-3 bg-amber-200 max-h-28 max-w-2xs flex flex-col justify-center items-center gap-3"
            key={ind}
          >
            <div className="text-black">{member.user?.name}</div>

            <div className="flex gap-2">
              {member.user?.Friend.length > 0 ? (
                !member.user?.sender?.[0]?.isAccepted &&
                !member.user?.reciever?.[0]?.isAccepted ? (
                  <span className="bg-orange-500 p-2 rounded-2xl">Pending</span>
                ) : (
                  <span className="bg-green-500 p-2 rounded-2xl">Friend</span>
                )
              ) : (
                <button
                  className="bg-green-500 p-2 rounded-2xl"
                  onClick={() => {
                    sendRequest(member.user.id);
                  }}
                >
                  Connect
                </button>
              )}

              <button className="bg-blue-500 p-2 rounded-2xl">
                View Profile
              </button>
            </div>
          </div>
        ))
      ) : (
        <>Hello</>
      )}
    </div>
  );
};

export default Planmember;
