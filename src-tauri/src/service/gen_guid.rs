use uuid::Uuid;

pub fn gen_guid() -> Uuid {
    Uuid::new_v4()
}
