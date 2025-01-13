import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import AuthLayout from "@/layouts/AuthLayout";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PostAxiosWithFile } from "@/shared/utils/customAxios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth-store";

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
    userType: z.enum(["VIEWER", "CREATOR"]).optional(),
    age: z.coerce.number().min(18).max(35),
    status: z.enum(["active", "inactive", "invisible"]),
    checked: z.boolean(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords did not match",
    path: ["confirm_password"],
  });

function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    window.history.back();
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photo: undefined,
      checked: false,
      email: "",
      password: "",
      confirm_password: "",
      contactNumber: "",
      pronoun: "",
      name: {
        firstName: "",
        lastName: "",
      },
      status: "active",
      userType: "VIEWER",
      age: 25,
      bio: "",
    },
  });

  const fnameW = form.watch("name.firstName");
  const lnameW = form.watch("name.lastName");
  const ageW = form.watch("age");
  const emailW = form.watch("email");
  const passW = form.watch("password");
  const confirm_passW = form.watch("confirm_password");
  const checkedW = form.watch("checked");
  const [disabledCheck, setDisabledCheck] = React.useState(true);
  React.useEffect(() => {
    if (
      fnameW !== "" &&
      lnameW !== "" &&
      emailW !== "" &&
      passW !== "" &&
      confirm_passW !== ""
    ) {
      setDisabledCheck(false);
    } else {
      setDisabledCheck(true);
    }
  }, [fnameW, lnameW, ageW, emailW, passW, confirm_passW]);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    const formData = new FormData();

    if (values.name.firstName) {
      formData.append("firstName", values.name.firstName);
    }
    if (values.name.lastName) {
      formData.append("lastName", values.name.lastName);
    }
    if (values.age) {
      formData.append("age", values.age.toString());
    }
    if (values.bio) {
      formData.append("bio", values.bio);
    }
    if (values.gender) {
      formData.append("gender", values.gender);
    }
    if (values.userType) {
      formData.append("userType", values.userType);
    }
    if (values.contactNumber) {
      formData.append("contactNumber", values.contactNumber);
    }
    if (values.email) {
      formData.append("email", values.email);
    }
    if (values.password) {
      formData.append("password", values.password);
    }

    if (values.photo && values.photo[0]) {
      formData.append("file", values.photo[0]); // Assuming the file is being added properly.
    }

    if (values.pronoun) {
      formData.append("pronoun", values.pronoun);
    }
    try {
      const { data } = await PostAxiosWithFile(
        "https://authisazure-hzhsgpg8a5dja6gx.uksouth-01.azurewebsites.net/api/v1/user/create",
        formData
      );

      if (data) {
        toast({
          variant: "default",
          title: "User Registration Successful!",
          description:
            "You have been successfully registered. Please look into your provided email for further instructions.",
        });

        console.log(data.data.id);
        setTimeout(() => {
          navigate(`/auth/${data.data.id}/otp-verification`);
        }, 1500);
      }

      // Here you would typically send the data to your backend
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "User Registration unsuccessful!",
        description: error.message,
      });
    }
  };
  // console.log(form.formState.errors);
  return (
    <AuthLayout>
      <div className="text-whiteh-[85vh] w-full max-w-md overflow-hidden flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-opacity-35 p-8 rounded-md border-2 border-slate-200">
        <div className="flex justify-between items-center">
          <h6 className="mb-5 font-pacifico text-3xl text-center">Create Account</h6>
          <button
            className="font-pacifico text-2xl font-bold"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            Login!
          </button>
        </div>

        <Form {...form}>
          <form
            style={{ boxSizing: "border-box" }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 overflow-y-auto hidden-scrollbar flex-1 text-lg "
          >
            {/* Name */}
            <div className="flex space-x-3">
              <FormField
                control={form.control}
                name="name.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input className="text-black" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input className="text-black"  placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex space-x-3">
              <div className="w-full">
                {/* Age */}
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="18"
                          className="w-full text-black"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="text-black">
                      <FormLabel className="text-white">Gender</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue className="text-black" placeholder="Select a gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="text-black">
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
            </div>
            {/* Pronoun */}
            <FormField
              control={form.control}
              name="pronoun"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pronoun</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Exp: He | She | They | Them"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            {/* userType */}
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel className="text-white">User Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CREATOR">CREATOR</SelectItem>
                      <SelectItem value="VIEWER">VIEWER</SelectItem>
                      {/* <SelectItem value="OTHER">Other</SelectItem> */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* photo */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo</FormLabel>
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
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+8801754XXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhon_doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField 
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*confirm Password */}
            <FormField 
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel className=" text-white">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Bio */}
            <FormField 
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel className="text-white" >Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Bio..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="checked"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    {...form.register("checked")}
                    checked={field.value}
                    onCheckedChange={(value) => field.onChange(value)}
                    disabled={disabledCheck}
                  />
                  <label
                    htmlFor="checked"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                </div>
              )}
            />
            <Button disabled={checkedW === false ? true : false} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}

export default Register;
