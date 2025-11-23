import { Algorithm } from './types';

export const ALGORITHMS: Algorithm[] = [
  {
    "name": "AES-256",
    "full_name": "Advanced Encryption Standard (Rijndael)",
    "category": "Symmetric Encryption",
    "year_published": 2001,
    "creator": "Joan Daemen, Vincent Rijmen",
    "description": "Block cipher operating on 128-bit blocks with 256-bit keys, using substitution-permutation network.",
    "abstract": "AES is the U.S. government standard for encrypting classified information. It uses a mathematical structure called a substitution-permutation network where data is repeatedly mixed, substituted, and XORed with derived keys.",
    "original_paper_url": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197-upd1.pdf",
    "reference_implementation_url": "https://github.com/openssl/openssl",
    "mathematical_foundation": {
      "overview": "AES operates on the Galois Field GF(2^8). Key operations include polynomial multiplication and inversion.",
      "formulas": [
        "SubBytes: S(a[i,j]) = Affine(GF(2^8)^-1(a[i,j]))",
        "MixColumns: b[i] = 02⋅a[i] ⊕ 03⋅a[i+1] ⊕ a[i+2] ⊕ a[i+3]",
        "AddRoundKey: state ← state ⊕ RoundKey[round]"
      ],
      "complexity_class": "O(1) per byte"
    },
    "example_walkthrough": {
        "plaintext": "HELLO WORLD!!!!",
        "steps": [
            "1. Initial Round: XOR state with Key",
            "2. SubBytes: Replace bytes via S-Box",
            "3. ShiftRows: Rotate rows cyclically",
            "4. MixColumns: Combine bytes in columns",
            "5. AddRoundKey: XOR with round key",
            "... Repeat for 14 rounds"
        ]
    },
    "security_properties": {
      "quantum_resistant": false,
      "known_attacks": ["Grover's algorithm (theoretical)", "Side-channel"],
      "nist_status": "Approved",
      "fips_approved": true,
      "avalanche_effect": "Strong (~50% bit flip)"
    },
    "performance": {
      "throughput_mbps": 600,
      "memory_footprint_kb": 1,
      "implementation_complexity": "Medium",
      "hardware_acceleration": true
    },
    "specifications": {
      "block_size": 128,
      "key_sizes": [128, 192, 256],
      "rounds": 14
    },
    "use_cases": ["HTTPS/TLS", "File encryption (BitLocker)", "WPA2/WPA3 WiFi"],
    "standards": ["FIPS 197", "ISO/IEC 18033-3"],
    "license": "Public Domain"
  },
  {
    "name": "RSA-2048",
    "full_name": "RSA Cryptosystem",
    "category": "Asymmetric Encryption & Digital Signatures",
    "year_published": 1977,
    "creator": "Rivest, Shamir, Adleman",
    "description": "Public-key cryptosystem based on the difficulty of factoring large composite numbers.",
    "abstract": "RSA enables secure communication between parties who have never met. It relies on the fact that while multiplying two large primes is easy, factoring their product is computationally infeasible.",
    "original_paper_url": "https://people.csail.mit.edu/rivest/Rsapaper.pdf",
    "reference_implementation_url": "https://github.com/openssl/openssl",
    "mathematical_foundation": {
      "overview": "Based on Euler's theorem: a^φ(n) ≡ 1 (mod n).",
      "formulas": [
        "n = p × q",
        "φ(n) = (p-1)(q-1)",
        "e × d ≡ 1 (mod φ(n))",
        "Encryption: c ≡ m^e (mod n)",
        "Decryption: m ≡ c^d (mod n)"
      ],
      "complexity_class": "Encryption O(k^2), Decryption O(k^3)"
    },
    "example_walkthrough": {
        "steps": [
            "1. Choose p=61, q=53",
            "2. n = 3233, φ(n) = 3120",
            "3. Choose e=17",
            "4. Compute d=2753",
            "5. Encrypt m=65: c = 65^17 mod 3233 = 2790"
        ]
    },
    "security_properties": {
      "quantum_resistant": false,
      "known_attacks": ["Shor's Algorithm (Quantum)", "Timing attacks"],
      "nist_status": "Approved",
      "fips_approved": true
    },
    "performance": {
      "implementation_complexity": "High",
      "hardware_acceleration": true,
      "throughput_mbps": 0.5 // Slow
    },
    "specifications": {
      "key_sizes": [1024, 2048, 4096],
      "block_size": "Key length dependent"
    },
    "use_cases": ["Digital Signatures", "SSL/TLS Certificates", "PGP Email"],
    "standards": ["PKCS#1", "RFC 3447"],
    "license": "Public Domain"
  },
  {
    "name": "SHA-256",
    "full_name": "Secure Hash Algorithm 256-bit",
    "category": "Cryptographic Hash Function",
    "year_published": 2001,
    "creator": "NSA",
    "description": "Hash function producing a 256-bit digest from any input size. Part of SHA-2 family.",
    "abstract": "SHA-256 is the backbone of integrity verification. It transforms any input into a unique 64-character hexadecimal fingerprint. Any change to the input drastically changes the hash (avalanche effect).",
    "original_paper_url": "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf",
    "reference_implementation_url": "https://github.com/openssl/openssl",
    "mathematical_foundation": {
      "overview": "Uses Merkle-Damgård construction with bitwise operations (Sigma, Ch, Maj) over 64 rounds.",
      "formulas": [
        "Ch(x,y,z) = (x ∧ y) ⊕ (¬x ∧ z)",
        "Maj(x,y,z) = (x ∧ y) ⊕ (x ∧ z) ⊕ (y ∧ z)",
        "T1 = h + Σ1(e) + Ch(e,f,g) + K[i] + W[i]"
      ],
      "complexity_class": "O(n)"
    },
    "example_walkthrough": {
        "steps": [
            "1. Pad message to 512-bit multiple",
            "2. Initialize 8 working variables (a-h)",
            "3. Expand message schedule W[0..63]",
            "4. Run 64 rounds of compression",
            "5. Add compressed chunk to current hash state"
        ]
    },
    "security_properties": {
      "quantum_resistant": "Partially",
      "known_attacks": ["Length extension (if not HMAC)", "Theoretical Grover"],
      "nist_status": "Approved",
      "collision_resistance": "Strong",
      "preimage_resistance": "Strong"
    },
    "performance": {
      "throughput_mbps": 2000,
      "memory_footprint_kb": 0.25,
      "implementation_complexity": "Medium"
    },
    "specifications": {
      "output_size": 256,
      "block_size": 512,
      "rounds": 64
    },
    "use_cases": ["Bitcoin Mining", "TLS Certificates", "Git Commit Hashes", "Password Storage"],
    "standards": ["FIPS 180-4", "RFC 6234"],
    "license": "Public Domain"
  },
  {
    "name": "SECP256K1",
    "full_name": "Elliptic Curve Cryptography (SECP256K1)",
    "category": "Asymmetric Encryption & Digital Signatures",
    "year_published": 2000,
    "creator": "Certicom Research",
    "description": "ECC curve used by Bitcoin and Ethereum for digital signatures.",
    "abstract": "ECC provides RSA-level security with much smaller keys. SECP256K1 relies on the discrete logarithm problem over the curve y² = x³ + 7. It allows for efficient signing and verification of transactions.",
    "original_paper_url": "https://www.secg.org/sec2-v2.pdf",
    "reference_implementation_url": "https://github.com/bitcoin-core/secp256k1",
    "mathematical_foundation": {
      "overview": "Weierstrass curve over finite field.",
      "curve_equation": "y² = x³ + 7 (mod p)",
      "formulas": [
        "Q = d × G (Public Key = Private × Generator)",
        "Point Addition: P + Q = R",
        "Point Doubling: P + P = 2P"
      ],
      "complexity_class": "O(√n) to break"
    },
    "example_walkthrough": {
        "steps": [
            "1. Select private key d (random integer)",
            "2. Perform scalar multiplication Q = d × G",
            "3. Sign: Generate random k, compute R = k×G",
            "4. Compute s = k^-1 (hash + r×d) mod n"
        ]
    },
    "security_properties": {
      "quantum_resistant": false,
      "known_attacks": ["Shor's Algorithm"],
      "nist_status": "Safe (used in Bitcoin)",
      "fips_approved": false // P-256 is FIPS, K1 is not
    },
    "performance": {
      "implementation_complexity": "Very High",
      "hardware_acceleration": true,
      "throughput_mbps": 10 // Signatures per sec is the metric
    },
    "specifications": {
      "key_sizes": [256],
      "output_size": "64 bytes (signature)"
    },
    "use_cases": ["Bitcoin", "Ethereum", "Blockchain Identity"],
    "standards": ["SEC 2 v1.0"],
    "license": "Public Domain (Params)"
  },
  {
    "name": "Diffie-Hellman",
    "full_name": "Diffie-Hellman Key Exchange",
    "category": "Key Exchange Protocol",
    "year_published": 1976,
    "creator": "Diffie, Hellman, Merkle",
    "description": "Protocol for securely exchanging cryptographic keys over a public channel.",
    "abstract": "Allows two parties to jointly establish a shared secret key over an insecure channel. Based on modular exponentiation. An eavesdropper sees the exchange but cannot compute the final secret.",
    "original_paper_url": "https://www.paulgraham.com/diffiehellman.html",
    "reference_implementation_url": "https://github.com/openssl/openssl",
    "mathematical_foundation": {
      "overview": "Relies on Discrete Logarithm Problem.",
      "formulas": [
        "A computes: g^a mod p",
        "B computes: g^b mod p",
        "Shared Secret: (g^b)^a mod p = (g^a)^b mod p"
      ],
      "complexity_class": "O(log n) compute, O(√p) break"
    },
    "example_walkthrough": {
        "steps": [
            "1. Agree on p=23, g=5",
            "2. Alice chooses a=6, sends 5^6 mod 23 = 8",
            "3. Bob chooses b=15, sends 5^15 mod 23 = 19",
            "4. Alice computes 19^6 mod 23 = 2",
            "5. Bob computes 8^15 mod 23 = 2"
        ]
    },
    "security_properties": {
      "quantum_resistant": false,
      "known_attacks": ["Man-in-the-Middle (needs auth)", "LogJam"],
      "nist_status": "Approved"
    },
    "performance": {
      "throughput_mbps": 0,
      "implementation_complexity": "Low"
    },
    "specifications": {
      "key_sizes": [2048, 3072, 4096]
    },
    "use_cases": ["TLS Handshake", "VPN (IKE)", "SSH"],
    "standards": ["RFC 2631"],
    "license": "Public Domain"
  },
  {
    "name": "HMAC",
    "full_name": "Hash-Based Message Authentication Code",
    "category": "Message Authentication Code",
    "year_published": 1997,
    "creator": "Bellare, Canetti, Krawczyk",
    "description": "Authentication code combining a hash function with a secret key.",
    "abstract": "Ensures integrity and authenticity. Unlike a simple hash, HMAC uses a secret key so attackers cannot generate a valid hash for a modified message.",
    "original_paper_url": "https://tools.ietf.org/html/rfc2104",
    "reference_implementation_url": "https://github.com/openssl/openssl",
    "mathematical_foundation": {
      "overview": "Nested hashing with padding.",
      "formulas": [
        "HMAC(K, m) = H((K' ⊕ opad) || H((K' ⊕ ipad) || m))",
        "ipad = 0x3636...",
        "opad = 0x5C5C..."
      ],
      "complexity_class": "O(n)"
    },
    "example_walkthrough": {
        "steps": [
            "1. Pad Key to block size",
            "2. XOR Key with ipad, append message, Hash it",
            "3. XOR Key with opad, append result of (2), Hash it"
        ]
    },
    "security_properties": {
      "quantum_resistant": "Yes (generally)",
      "known_attacks": ["None practical"],
      "nist_status": "Approved",
      "fips_approved": true
    },
    "performance": {
      "throughput_mbps": 2000,
      "implementation_complexity": "Low"
    },
    "specifications": {
      "output_size": "Hash dependent"
    },
    "use_cases": ["API Authentication (JWT)", "AWS Signatures", "Payment Systems"],
    "standards": ["RFC 2104", "FIPS 198-1"],
    "license": "Public Domain"
  }
];
