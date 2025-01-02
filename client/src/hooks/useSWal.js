// useSwal.js
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Make sure to import CSS

const useSwal = () => {
  const showSuccessAlert = () => {
    Swal.fire({
      position: 'top-end',
      title: 'Your operation was successful!',
      showConfirmButton: false,
      timer: 2500,
      didOpen: (popup) => {
        popup.style.color = 'green'; // Set the text color to green
        popup.style.fontSize='10px'
      },
      customClass: {
        popup: 'custom-swal-height' // Add custom CSS class if needed
      }
    });
  };
  const showErrorAlert = (message) => {
    Swal.fire({
      position: 'top-end',
      title: message,
      showConfirmButton: false,
      timer: 2500,
      width:'auto',
      didOpen: (popup) => {
        popup.style.color = 'red'; // Set the text color to green
        popup.style.fontSize='10px'

      },
      customClass: {
        popup: 'custom-swal-height' // Add custom CSS class if needed
      }
    });
  };

  return { showSuccessAlert,showErrorAlert };
};

export default useSwal;
