import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import DefaultLayout from "@/layouts/DefaultLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { z } from "zod";
const fileTypes = ["image/png", "image/jpeg"]; // defining accepting file types

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .max(12, "Password can't be more than 12 characters")
      .min(6, "Password can't be less than 6 characters"),
    confirm_password: z
      .string()
      .max(12, "Password can't be more than 12 characters")
      .min(6, "Password can't be less than 6 characters"),
    name: z.object({
      firstName: z.string().min(3),
      lastName: z.string().min(2),
    }),
    bio: z.string().optional(),
    contactNumber: z.string().optional(),
    photo: z
      .instanceof(FileList)
      .refine((files) => files?.length === 1, {
        message: "Please upload exactly one file",
      })
      .refine(
        (files) =>
          files instanceof FileList && fileTypes.includes(files[0].type),
        {
          message: "Please add png or jpg files.",
        }
      )
      .refine((files) => files?.[0] && fileTypes.includes(files[0].type), {
        message: "Please add png or jpg files.",
      })
      .optional(),
    pronoun: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    age: z.coerce.number().min(18).max(35),
    status: z.enum(["active", "inactive", "invisible"]),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords did not match",
    path: ["confirm_password"],
  });
function Profile() {
  const userData:unknown = useLoaderData();

  const {
    email,
    firstName,
    lastName,
    age,
    gender,
    pronoun,
    contactNumber,
    bio,
  } = userData.data.data;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: undefined,
      email: email,
      password: "",
      confirm_password: "",
      contactNumber: contactNumber,
      pronoun: pronoun,
      name: {
        firstName: firstName,
        lastName: lastName,
      },
      status: "active",
      age: age,
      bio: bio,
      gender: gender,
    },
  });

  const [update, setUpdate] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setUpdate(!update);
    // const formData = new FormData();
    // if (values.name.firstName) {
    //   formData.append("firstName", values.name.firstName);
    // }
    // if (values.name.lastName) {
    //   formData.append("lastName", values.name.lastName);
    // }
    // if (values.age) {
    //   formData.append("age", values.age.toString());
    // }
    // if (values.bio) {
    //   formData.append("bio", values.bio);
    // }
    // if (values.gender) {
    //   formData.append("gender", values.gender);
    // }
    // if (values.contactNumber) {
    //   formData.append("contactNumber", values.contactNumber);
    // }
    // if (values.email) {
    //   formData.append("email", values.email);
    // }
    // if (values.password) {
    //   formData.append("password", values.password);
    // }

    // if (values.photo && values.photo[0]) {
    //   formData.append("file", values.photo[0]); // Assuming the file is being added properly.
    // }

    // if (values.pronoun) {
    //   formData.append("pronoun", values.pronoun);
    // }
  };
  return (
    <DefaultLayout>
      <h1 className="text-[24px] font-pacifico tracking-widest">Profile</h1>
      <div className="w-full relative  ">
        <Form {...form}>
          <form
            style={{ boxSizing: "border-box" }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-5 space-y-2.5 "
          >
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="name.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[16px] tracking-wider">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="name.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[16px] tracking-wider">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[16px] tracking-wider">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="jhon_doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[16px] tracking-wider">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div
              className={` flex-col space-y-1.5 ${update ? "flex" : "hidden"}`}
            >
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[16px] tracking-wider">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[16px] tracking-wider">
                      Age
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="18"
                        className="w-full"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[16px] tracking-wider">
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="pronoun"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[16px] tracking-wider">
                      Pronoun
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Exp: He | She | They | Them"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[16px] tracking-wider">
                      Photo
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[16px] tracking-wider">
                      Contact Number
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="+8801754XXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-[16px] tracking-wider">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Bio..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              className={`w-full ${update ? "block" : "hidden"}`}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
        <div className="absolute right-0 top-0">
          <Button onClick={() => setUpdate(!update)}>
            {update ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Profile;
