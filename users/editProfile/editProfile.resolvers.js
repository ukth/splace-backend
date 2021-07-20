import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, userName, email, password: newPassword, profileMessage, profilePhoto },
  { loggedInUser }
) => {
  let profilePhotoUrl = null;
  if (profilePhoto) {
    const { filename, createReadStream } = await profilePhoto;
    const newFilename = `${loggedInUser.user_id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    profilePhotoUrl = `http://localhost:4000/static/${newFilename}`;
  }
  let hashedPassword = null;
  if (newPassword) {
    hashedPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      user_id: loggedInUser.user_id,
    },
    data: {
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
      email,
      profile_message: profileMessage,
      ...(hashedPassword && { password: hashedPassword }),
      ...(profilePhotoUrl && { profile_photo: profilePhotoUrl }),
    },
  });
  if (updatedUser.user_id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};