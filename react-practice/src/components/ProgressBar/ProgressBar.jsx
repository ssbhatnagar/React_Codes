import { useState, useEffect } from 'react'
import Styles from '../ProgressBar/ProgressBar.module.css'

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(100, prev + 10));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress]); 
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
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => setProgress(0)}>Reset Progress</button>
      </div>
    </div>
  )
}

export default ProgressBar