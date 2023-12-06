import axios from "axios";
import md5 from "md5";

function generateUsername() {
    const currentDate = new Date();
    const formattedDate =
    currentDate.getDate().toString().padStart(2, "0") +
      (currentDate.getMonth() + 1) +
      (currentDate.getFullYear() % 100).toString().padStart(2, "0");
    const dynamicSuffix = "C" + (((currentDate.getHours() % 24)+1) >= 24 ? '00' : (currentDate.getHours() % 24)+1).toString().padStart(2, "0");
    return `tesprogrammer${formattedDate}${dynamicSuffix}`;
  }

  function generatePassword() {
    const currentDate = new Date();
    const res = `bisacoding-${currentDate.getDate().toString().padStart(2, "0")}-${
      currentDate.getMonth() + 1
    }-${(currentDate.getFullYear() % 100).toString().padStart(2, "0")}`;
    console.log(res)
    return md5(res);
  }
  
  async function login() {
    try {
        const currentDate = new Date();
        console.log(generateUsername())
        console.log(generatePassword())
        console.log(((currentDate.getHours() % 24)) >= 24 ? '00' : (currentDate.getHours() % 24+1).toString().padStart(2, "0"))
      const { data } = await axios.post(
        "https://recruitment.fastprint.co.id/tes/api_tes_programmer",
        {
          username: generateUsername(),
          password: generatePassword(),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  }

  export default login;