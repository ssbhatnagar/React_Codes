import { useState, useEffect } from 'react'
import Styles from '../ProgressBar/ProgressBar.module.css'

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Condition: Timer tabhi chalega jab progress 100 se kam ho
    if (progress < 100) {
      const timer = setTimeout(() => {
        // Har baar progress ko 10 se badha rahe hain, max limit 100 rakhi hai
        setProgress((prev) => Math.min(100, prev + 10));
      }, 500); // 500ms = 0.5 seconds ka delay

      // Cleanup Function: Ye memory leaks ko rokta hai aur multiple timers banne se bachata hai
      return () => clearTimeout(timer);
    }
  }, [progress]); // Dependency array: Har baar jab progress change hoga, ye useEffect wapas run hoga

  return (
    <div>
      <h1>Progress Bar</h1>
      <div className={Styles.outer}>
        <div 
          className={Styles.inner} 
          style={{ 
            transform: `translateX(${progress - 100}%)`
          }}
          role='progressbar'
          aria-valuenow={progress}
          aria-valuemax="100"
          aria-valuemin="0"
        >
          {progress}%
        </div>
      </div>
      
      {/* Test karne ke liye ek Reset button de diya hai */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => setProgress(0)}>Reset Progress</button>
      </div>
    </div>
  )
}

export default ProgressBar