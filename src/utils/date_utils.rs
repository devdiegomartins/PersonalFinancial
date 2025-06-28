use chrono::{DateTime, Utc};

/// Obtém a data e hora atual em UTC
pub fn now_utc() -> DateTime<Utc> {
    Utc::now()
}

/// Converte uma string ISO 8601 para DateTime<Utc>
pub fn parse_utc_from_iso(iso_string: &str) -> Result<DateTime<Utc>, chrono::ParseError> {
    DateTime::parse_from_rfc3339(iso_string).map(|dt| dt.with_timezone(&Utc))
}

/// Formata um DateTime<Utc> para string ISO 8601
pub fn format_utc_to_iso(dt: &DateTime<Utc>) -> String {
    dt.to_rfc3339()
}

/// Formata um DateTime<Utc> para exibição amigável
pub fn format_utc_for_display(dt: &DateTime<Utc>) -> String {
    dt.format("%d/%m/%Y %H:%M:%S UTC").to_string()
}

/// Cria um DateTime<Utc> a partir de componentes individuais
pub fn create_utc_datetime(
    year: i32,
    month: u32,
    day: u32,
    hour: u32,
    minute: u32,
    second: u32,
) -> Option<DateTime<Utc>> {
    let date = chrono::NaiveDate::from_ymd_opt(year, month, day)?;
    let time = chrono::NaiveTime::from_hms_opt(hour, minute, second)?;
    let naive = chrono::NaiveDateTime::new(date, time);
    Some(DateTime::from_naive_utc_and_offset(naive, Utc))
}
