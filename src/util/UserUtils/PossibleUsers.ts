import Gamer from "../../memory/component/Gamer";

export const possibleUsers = [
  { name: "dog" },
  { name: "dolphin" },
  { name: "lion" },
  { name: "hat" },
];

export const assignFreeAvatar = (
  usersConnected: Gamer[]
): string | undefined => {
  const freeUsers = [...possibleUsers];

  usersConnected.forEach((userConnected) => {
    const notFreeAvatarIndex = freeUsers.findIndex(
      (avatar) => avatar.name === userConnected.getName()
    );
    freeUsers.splice(notFreeAvatarIndex, 1);
  });
  return freeUsers.at(0)?.name;
};
