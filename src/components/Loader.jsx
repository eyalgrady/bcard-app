import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

// export function LinearLoader() {
//   return (
//     <div style={{ width: '100%' }}>
//       <LinearProgress />
//     </div>
//   );
// }


export default function CircularLoader() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // רקע כהה עם שקיפות
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999 // מבטיח שהטוען יופיע מעל לתוכן אחר
    }}>
      <CircularProgress size={80} /> {/* גודל מוגדל של העיגול */}
    </div>
  );
}