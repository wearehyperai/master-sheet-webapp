/**
 * Format a date string to 'MMM DD, YYYY' format (e.g., "Mar 15, 2025")
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    
    return date.toLocaleDateString('en-US', options);
  }
  
  /**
   * Format a date string to 'MMM DD, YYYY, HH:MM AM/PM' format (e.g., "Mar 15, 2025, 09:45 AM")
   */
  export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    
    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    
    return `${formattedDate}, ${formattedTime}`;
  }
  
  /**
   * Format a number with commas for thousands (e.g., 1,234,567)
   */
  export function formatNumber(num: number): string {
    return num.toLocaleString('en-US');
  }
  
  /**
   * Format milliseconds to a human-readable format (e.g., "2.5s" or "350ms")
   */
  export function formatDuration(milliseconds: number): string {
    if (milliseconds >= 1000) {
      return `${(milliseconds / 1000).toFixed(1)}s`;
    }
    return `${milliseconds}ms`;
  }
  
  /**
   * Format bytes to human-readable format (e.g., "1.5 MB" or "820 KB")
   */
  export function formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  }
  
  /**
   * Truncate a string with ellipsis if it exceeds a certain length
   */
  export function truncateString(str: string, maxLength: number = 50): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  }