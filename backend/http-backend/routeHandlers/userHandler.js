import { CreateUserSchema } from "../utils/zodValidation.js";
import { hashPassword, verifyPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import * as UserService from "../../prisma/services/userService.js";
import { uploadImage } from "../utils/ImagesUtils.js";
import { supabase } from "../server.js";

export const signup = async (req, res) => {
  try {
    const result = CreateUserSchema.safeParse(req.body);

    if (!result.success) {
      res.status(403).json({
        message: result.error.message,
      });
      return;
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const Age = parseInt(req.body.Age);

    const city = req.body.city;
    const country = req.body.country;
    const pincode = req.body.pincode;

    const hashedPassword = await hashPassword(password);

    let user = await UserService.createUser(email, name, hashedPassword, Age);

    if (!user) res.json({ msg: "no user is created " });

    const userId = user.id;

    const addEntry = await UserService.createAddress(
      city,
      country,
      pincode,
      userId
    );

    if (!user) {
      res.json({
        msg: "Something went wrong",
      });
    }
    res.json({
      message: "user created succesfully!",
      id: user.id,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error signin up!",
      error: e,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let user = await UserService.getUserByEmail(email);

    if (!user) {
      res.status(404).json({
        message: "User does not exist",
      });
      return;
    }

    const validity = await verifyPassword(password, user.password);

    if (!validity) {
      res.status(404).json({
        message: "Incorrect credentials",
      });
      return;
    }

    const token = generateToken(user.id);
    const userInfo = await UserService.getMyinformation(user.id);

    res.json({
      token: token,
      user: userInfo,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error signing in",
      error: e,
    });
  }
};

// export const getMyRooms = async (req, res) => {
//   try {
//     const userId = req.id;
//     const user = await UserService.getCreatedRoomsByUserId(userId);
//     if (!user) {
//       res.status(404).json({
//         message: "User not found.",
//       });
//       return;
//     }

//     if (!user.createdPlans?.length) {
//       res.json({
//         message: "No rooms available.",
//         data: {
//           userName: user.name,
//           rooms: [],
//         },
//       });
//       return;
//     }
//     const formattedRooms = user.createdPlans.map((room) => ({
//       roomId: room.id,
//       roomName: room.roomName,
//       createdAt: room.createdAt, // Sending raw timestamp
//       participants: room.members.map((participant) => participant.name), // Correct relation key
//       noOfParticipants: room.members.length, // Correct relation key
//     }));
//     res.json({
//       message: "Admin rooms fetched successfully.",
//       data: {
//         userName: user.name,
//         rooms: formattedRooms,
//       },
//     });
//     return;
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal server error.",
//     });
//     return;
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    const file = req.file;
    const userId = parseInt(req.id);
    let image_url = null;
    const user = await UserService.getUserById(userId);

    if (file && user.profileImage) {
      image_url = await uploadImage(supabase, file, "User", user.profileImage);
    } else if (file) {
      image_url = await uploadImage(supabase, file, "User");
    }

    const userdata = req.body;
    if (image_url) {
      userdata.profileImage = image_url;
    }
    await UserService.updateProfile(userdata, userId);
    const response = await UserService.getMyinformation(userId);
    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};
export const getUsers = async (req, res) => {
  try {
    const userId = req.id;
    const data = await UserService.getUser(userId);

    if (data) {
      res.json({
        res: data,
      });
    } else {
      res.json({
        res: "Unble fetch users",
      });
    }
  } catch (e) {
    res.json({
      msg: e,
    });
  }
};
