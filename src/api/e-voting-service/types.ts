export interface CreateUserRequest {
  username: string;
  citizen_id: string;
  citizen_name: string;
  email: string;
  public_key: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface VotingRequest {
  username: string;
  server_id: string;
  voting_hex: string;
  signature_hex: string;
}

export interface VerifyUsers {
  usernames: string[];
  admin_id: string;
  signature_hex: string;
}

export interface Candidate {
  candidate_name: string;
  citizen_id: string;
  avatar_url: string;
}

export interface CreateVotingServerRequest {
  admin_id: string;
  number_of_candidates: number;
  maximum_number_of_voters: number;
  server_name: string;
  candidates: Candidate[];
  signature_hex: string;
  exp_time: string;
}

export interface GetVotingServerByIdRequest {
  server_id: string;
}

export interface OpenVoteRequest {
  admin_id: string;
  server_id: string;
  signature_hex: string;
}

export interface PublishVoteRequest {
  server_id: string;
}

export interface Candidate {
  candidate_name: string;
  citizen_id: string;
  avatar_url: string;
  index: number;
}

export interface VotingServer {
  number_of_candidates: number
  maximum_number_of_voters: number;
  server_name: string;
  server_id: string;
  opened_vote: boolean;
  results: string;
  active: boolean;
  exp_time: number;
}

export interface ExtendedVotingServer {
  voting_server: VotingServer;
  candidates: Candidate[];
}


export interface InfoUser {
  username: string;
  citizen_id: string;
  citizen_name: string;
  verified: boolean;
  email: string;
  compressed_key: string;
}

export interface ActiveVotingServerRequest {
  admin_id: string;
  server_id: string;
  signature_hex: string;
}

