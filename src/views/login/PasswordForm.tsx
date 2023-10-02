// import { FC, useEffect } from "react";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { BiLoaderAlt as Loader } from "react-icons/bi";
// import toast from "react-hot-toast";
// import { useSession } from "next-auth/react";
// import { useForgetPasswordMutation } from "@/store/services/passwordService";

// const formSchema = z.object({
//   email: z.string().email({ message: "Invalid email format." }).optional(),
// });

// interface ForgotPasswordFormProps {
//   setOpen: () => void;
// }

// const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ setOpen }) => {
//   const { data: session } = useSession();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   function onSubmit(values: z.infer<typeof formSchema>) {

//     const [create, createResponse] = useForgetPasswordMutation();

    
//   const {
//     isLoading: createLoading,
//     isError: createError,
//     isSuccess: createSuccess,
//   } = createResponse;

  
//   useEffect(() => {
//     if (createError) {
//       toast.error("Something Wrong.");
//     }
//     if (createSuccess) {
//       toast.success("Email sent wait for the OTP");
//       setOpen();
//     }
//   }, [createError, createSuccess]);
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="example@example.com" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button className="w-full" type="submit">
//           Send
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default ForgotPasswordForm;
