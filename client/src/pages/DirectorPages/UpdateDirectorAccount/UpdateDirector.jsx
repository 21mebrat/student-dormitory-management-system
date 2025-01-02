import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSearchParams } from "react-router-dom";
import "../../../components/Admin/manageAccout/createAccount/createAccount.css";
import { FaInfoCircle } from "react-icons/fa";
import { useGetUserByIdQuery, useUpdateUsersMutation } from "../../../redux/feature/auth/authApi";
import { updateUserValidationSchema } from "../../../utils/validationSchema";
import useSwal from "../../../hooks/useSWal";
import Title from "../../../components/title/Title";
import InputField from "../../../components/inputField/InputField";
import Button from "../../../components/button/Button";
import { useGetAccountByUserNameQuery } from "../../../redux/feature/Director/accountApi";

const UpdateDirector = () => {
  const [searchParams] = useSearchParams();
  const { showErrorAlert, showSuccessAlert } = useSwal();

  // Fetch the user based on the `userName` query parameter
  const {
    data: user,
    error: loadError,
    isError,
    isLoading,
    refetch
  } = useGetAccountByUserNameQuery({ userName: searchParams.get("userName") });
console.log(searchParams.get('userName'),'user')
  // Mutation for updating user details
  const [updateUsers, { error: updateError, isError: updateIsError }] = useUpdateUsersMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(updateUserValidationSchema),
  });

  // Populate form values when user data is fetched
  useEffect(() => {
    if (user) {
      setValue("userName", user?.userName || "");
      setValue("email", user?.email || "");
      setValue("id", user?._id || "");
    }
  }, [user, setValue, searchParams]);
  // Submit handler
  const onSubmit = async (data) => {
    const updatedData = {
      userName: data.userName,
      email: data.email,
      id: user?._id, // Use the user's ID fetched from the API
    };

    try {
      const response = await updateUsers(updatedData);
      console.log(response)
      if (updateIsError) {
        return showErrorAlert(updateError?.message || "Update failed. Please try again.");
      }

      showSuccessAlert("Account updated successfully!");
      refetch(); // Refetch user data after updating
    } catch (error) {
      showErrorAlert("Update Failed! Please try again.");
    }
  };

  // Handle loading and error states
  if (isLoading) return <p className="text-red-500 text-center">Loading...</p>;
  if (isError) return <p className="text-red-500 text-center">{loadError?.message || 'something go wrong'}</p>;

  return (
    <div className="main-create-account">
      <div className="create-account-container">
        <form className="create-account-from" onSubmit={handleSubmit(onSubmit)}>
          <Title title="Update Account Here." />

          {/* Username Field */}
          <InputField
            name="userName"
            type="text"
            required={true}
            placeholder="Enter Your Username"
            register={register}
          />
          {errors.userName && (
            <p className="error-message text-red-500 text-xs">
              <FaInfoCircle /> {errors?.userName?.message}
            </p>
          )}

          {/* Email Field */}
          <InputField
            name="email"
            type="email"
            required={true}
            placeholder="Enter Your Email"
            register={register}
          />
          {errors.email && (
            <p className="error-message text-red-500 text-xs">
              <FaInfoCircle /> {errors.email.message}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className={`btn-primary ${!Object.values(errors).some(Boolean) ? "enable" : "disabled"}`}
            name="Update"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateDirector;
