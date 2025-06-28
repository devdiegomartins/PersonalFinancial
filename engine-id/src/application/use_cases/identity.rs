use crate::domain::identity::{Identity, IdentityImpl};

pub fn create() -> Identity {
    Identity::new()
}
