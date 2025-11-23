export interface Algorithm {
  name: string;
  full_name: string;
  category: "Symmetric Encryption" | "Asymmetric Encryption & Digital Signatures" | "Cryptographic Hash Function" | "Key Exchange Protocol" | "Message Authentication Code";
  year_published: number;
  creator: string;
  description: string;
  abstract: string;
  original_paper_url: string;
  reference_implementation_url: string;
  
  mathematical_foundation: {
    overview: string;
    formulas: string[];
    complexity_class: string;
    curve_equation?: string;
  };

  example_walkthrough: any; // Flexible structure based on algorithm
  
  security_properties: {
    quantum_resistant: boolean | string;
    known_attacks: string[];
    nist_status: string;
    fips_approved?: boolean;
    collision_resistance?: string;
    preimage_resistance?: string;
    avalanche_effect?: string;
    perfect_secrecy?: boolean;
    [key: string]: any;
  };

  performance: {
    throughput_mbps?: number;
    memory_footprint_kb?: number;
    implementation_complexity?: string;
    hardware_acceleration?: boolean;
    [key: string]: any;
  };

  specifications: {
    block_size?: number | string;
    key_sizes?: number[] | string[];
    rounds?: number | string;
    output_size?: number | string;
    [key: string]: any;
  };

  use_cases: string[];
  standards: string[];
  license: string;
}

export interface VisualizationProps {
  algorithm: Algorithm;
  isActive: boolean;
}