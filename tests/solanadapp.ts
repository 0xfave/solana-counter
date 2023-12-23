import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Solanadapp } from "../target/types/solanadapp";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import { assert } from "chai";

describe("solanadapp", () => {
  // create and set a Provider
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Solanadapp as Program<Solanadapp>;
  
  const baseAccount = anchor.web3.Keypair.generate();

  it("Creates a counter", async () => {
    // call the create function via RPC
    await program.methods
      .create()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      })
      .signers([baseAccount])
      .rpc();

    // Fetch the account and check the value of count
    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Count 0: ", account.count.toString());
    assert.ok(account.count.toString() == 0);
  });

  it("Increments the counter", async () => {
  // const baseAccount = anchor.web3.Keypair.generate();

    await program.methods
      .increment()
      .accounts({ baseAccount: baseAccount.publicKey })
      .rpc();

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Count 1: ", account.count.toString());
    assert.ok(account.count.toString() == 1);
  });
});
