export function adaptUser(apiUser) {
  const [firstName, lastName] = apiUser.username?.split(" ") || [];

  return {
    id: apiUser.id,
    name: apiUser.username,
    firstName: firstName || apiUser.username,
    lastName: lastName || "",
    email: apiUser.email,
    phone: apiUser.phone || "",
    location: apiUser.location || "—",
    memberSince: apiUser.date_joined
      ? new Date(apiUser.date_joined).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "Recently joined",
  };
}
