
import ProfileCoverPage from "../components/ProfileCoverpage";
import ProfileTabs from "../components/ProfileTabs";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("auth") as never);
  const data = user;

  return (
    <div className="bg-light-bg min-h-screen md:ml-20">
      {data ? (
        <>
          <ProfileCoverPage data={data} currentPage="viewProfile" />
          <div className="mt-2 p-6">
            <ProfileTabs data={data} />
          </div>
        </>
      ) : (
        <></>
        // <Square />
      )}
    </div>
  );
}
