/// Nome do aplicativo usado em todo o projeto
pub const APP_NAME: &str = "Personal Financial App";

/// Versão do aplicativo
pub const APP_VERSION: &str = env!("CARGO_PKG_VERSION");

/// Descrição do aplicativo
pub const APP_DESCRIPTION: &str = "Financial management app";

/// Extensão do arquivo de dados
pub const DATA_FILE_EXTENSION: &str = "pfa";

/// Chave de criptografia AES-GCM (32 bytes)
pub const ENCRYPTION_KEY: [u8; 32] = [
    0x50, 0x65, 0x72, 0x73, 0x6f, 0x6e, 0x61, 0x6c, // Personal
    0x46, 0x69, 0x6e, 0x61, 0x6e, 0x63, 0x69, 0x61, // Financial
    0x6c, 0x41, 0x70, 0x70, 0x4b, 0x65, 0x79, 0x32, // AppKey2
    0x30, 0x32, 0x34, 0x21, 0x40, 0x23, 0x24, 0x25, // 024!@#$
];

/// Nonce para criptografia AES-GCM (12 bytes)
pub const ENCRYPTION_NONCE: [u8; 12] = [
    0x50, 0x65, 0x72, 0x73, 0x6f, 0x6e, 0x61, 0x6c, // Personal
    0x46, 0x69, 0x6e, 0x21, // Fin!
];
