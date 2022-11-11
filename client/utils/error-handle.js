import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const errorHandle = (err) => {
  const msg = err?.response?.data?.msg;

  if (msg) {
    MySwal.fire({
      icon: 'error',
      title: 'มีบางอย่างผิดพลาด',
      html: msg,
    });
  } else {
    console.error(msg);
  }
};
