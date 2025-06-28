use uuid::Uuid;

pub fn generate() -> Uuid {
    Uuid::new_v4()
}
