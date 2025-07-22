#[derive(Debug, Clone)]
pub enum AppStatusEnum {
    Initializing,   // App inicialization status
    ContentLoading, // App saved content loaded status
    Authentication, // Checking authorization access of application
    AuditRegister,  // Register audition access
    Completed,      // Final prepare to use application
}
