import { createContext, ReactNode, useMemo, useState } from "react";

const getInitialState = () => {
  if (window && window.localStorage) {
    const storedUser = window.localStorage.getItem("auth");
    /* istanbul ignore if */
    if (storedUser) return JSON.parse(storedUser);
  }
  return { name: "", role: "user", auth: false };
};

interface Props {
  children: ReactNode;
  // any props that come into the component
}

export const UserContext = createContext<any>(getInitialState);

function UserProvider({ children, ...props }: Props) {
  const [user, setUser] = useState<any>(getInitialState);
  const login = (data: any) => {
    /* istanbul ignore next */
    localStorage.setItem(
      "auth",
      JSON.stringify({
        ...data?.user
      })
    );

    setUser(() => ({
      id: data.user.id,
      firstname: data.user?.firstname,
      lastname: data.user?.lastname,
      auth: true,
      email: data.user?.email,
      role: data.user?.role,
      createdAt: data.user?.createdAt,
      username: data.user?.username,
      telephone: data.user?.telephone,
      country: data.user?.country,
      profilePicture: data.user?.profilePicture,
    }));
  };
  /* istanbul ignore next */
  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    
    setUser(() => ({ firstname: "", lastname: "", role: "user", auth: false }));
    
  };
  /* istanbul ignore next */
  const setName = (name: string) => {
    setUser({ ...user, name });
  };

  const value = useMemo(
    () => ({
      user,
      setName,
      login,
      logout,
    }),
    [user]
  );

  return (
    <UserContext.Provider {...props} value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
