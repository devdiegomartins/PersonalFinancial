use serde::Serialize;
use serde::de::DeserializeOwned;

pub fn serialize<T: DeserializeOwned>(
    data: &mut T,
    data_deserialized: &String,
) -> Result<(), serde_json::Error> {
    let data_to_serialize_json = serde_json::from_str::<T>(data_deserialized)?;
    *data = data_to_serialize_json;
    Ok(())
}

pub fn deserialize<T: Serialize>(
    data: &mut String,
    data_serialized: &T,
) -> Result<(), serde_json::Error> {
    let deserialized_data = serde_json::to_string(data_serialized)?;
    *data = deserialized_data;
    Ok(())
}
