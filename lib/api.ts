export async function resolveName(name: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Mock response
  if (name === "demo") {
    return {
      cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
      status: "active",
      type: "image",
      contentUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000",
    };
  }
  
  throw new Error("Name not found");
}

export async function uploadFile(file: File) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    cid: "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
    url: URL.createObjectURL(file),
  };
}

export async function registerName(name: string, cid: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    success: true,
    txHash: "0x123...abc",
  };
}

export async function reportContent(name: string, reason: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    proposalId: Math.floor(Math.random() * 1000),
  };
}

export async function fetchDAOProposals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      contentName: "illegal-content.eth",
      action: "De-index",
      votesFor: 1500,
      votesAgainst: 200,
      status: "Active",
      description: "Content violates community guidelines regarding explicit material.",
    },
    {
      id: 2,
      contentName: "spam-bot.eth",
      action: "Ban User",
      votesFor: 4500,
      votesAgainst: 100,
      status: "Passed",
      description: "Automated spam behavior detected by AI sentinel.",
    },
    {
      id: 3,
      contentName: "art-gallery.eth",
      action: "Verify",
      votesFor: 300,
      votesAgainst: 50,
      status: "Active",
      description: "Request for verified creator badge.",
    },
  ];
}

export async function voteOnProposal(id: number, support: boolean) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    newVotes: support ? 1501 : 201,
  };
}
